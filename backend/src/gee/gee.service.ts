import { Injectable, OnModuleInit, HttpException } from '@nestjs/common';
import * as ee from '@google/earthengine';
import * as path from 'path';
import { LandsatDto } from './dtos/landsat.dto';

@Injectable()
export class GeeService implements OnModuleInit {
  private initialised = false;
  private landsatData: LandsatDto | null = null;

  async onModuleInit() {
    // Initialization logic for GEE service
    await this.initialiseGEE();
  }

  async initialiseGEE(): Promise<void> {
    const privateKey = require(
      path.join(__dirname, '../../src/gee/.private-key.json'),
    );
    return new Promise((resolve, reject) => {
      ee.data.authenticateViaPrivateKey(
        privateKey,
        () => {
          ee.initialize(
            null,
            null,
            () => {
              console.log('✅ GEE Initialised');
              this.initialised = true;
              resolve();
            },
            (error: any) => {
              console.error('❌ GEE Inisialisation failed');
              reject(error);
            },
          );
        },
        (error: any) => {
          console.error('❌ GEE Inisialisation failed');
          reject(error);
        },
      );
    });
  }

  async getForestLoss(year: number | string) {
    if (!this.initialised)
      throw new HttpException('❌ GEE not initialised', 500);

    console.log(year);
    return { year };
  }

  async getLandsat() {
    if (!this.initialised)
      throw new HttpException('❌ GEE not initialised', 500);

    if (!this.landsatData) {
      console.log('Fetching landsat data');
      const lng = 0.1282;
      const lat = 51.508;
      const point = ee.Geometry.Point([lng, lat]);

      const landsat = ee
        .ImageCollection('LANDSAT/LC08/C02/T1')
        .filterDate('2025-01-01', '2026-01-01')
        .filterBounds(point);

      const composite = ee.Algorithms.Landsat.simpleComposite({
        collection: landsat,
        asFloat: true,
      });

      const visParams = {
        bands: ['B4', 'B3', 'B2'],
        min: 0,
        max: 0.3,
      };

      const result: LandsatDto = await new Promise((resolve, reject) => {
        composite.getMap(visParams, (mapId: any, err: any) => {
          if (err) return reject(err);
          resolve({
            mapId: mapId.mapid,
            token: mapId.token,
            url: mapId.urlFormat,
          });
        });
      });
      this.landsatData = result;
      return result;
    } else {
      console.log('Landsat data from local memory');
      return this.landsatData;
    }
  }
}
