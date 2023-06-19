import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Track } from './track.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track)
    private trackModel: typeof Track,
  ) {}
  async create() {
    return '';
  }
  async getAll() {
    return '';
  }
  async getOne() {
    return '';
  }
  async delete() {
    return '';
  }
}
