import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Items, ItemsDocument } from './schema/items.schema';

@Injectable()
export class ItemsService {

  constructor(@InjectModel(Items.name) private itemsModule: Model<ItemsDocument>) { }

  async create(createItemDto: CreateItemDto): Promise<ItemsDocument> {
    const createdItem = new this.itemsModule(createItemDto);
    return createdItem.save();
  }

  findAll(): Promise<ItemsDocument[]> {
    return this.itemsModule.find({}).exec();
  }

  async findOne(id: string): Promise<ItemsDocument | null> {
    return this.itemsModule.findById(id).exec();
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<ItemsDocument | null> {
    return this.itemsModule.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<ItemsDocument | null> {
    return this.itemsModule.findByIdAndDelete(id).exec();
  }
}

