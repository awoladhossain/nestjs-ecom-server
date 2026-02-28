import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async create(dto: CreateCategoryDto) {
    const exists = await this.categoryModel.findOne({ name: dto.name });
    if (exists) {
      throw new ConflictException('Category already exists');
    }
    const category = await this.categoryModel.create(dto);
    return { message: 'Category created', category };
  }

  async findAll() {
    return this.categoryModel.find({ isActive: true });
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
