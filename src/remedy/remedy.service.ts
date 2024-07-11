import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { FindRemedyDto } from './dto/find-remedy.dto';

@Injectable()
export class RemedyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addRemedy(createRemedyDto: Prisma.RemedyCreateInput) {
    return this.databaseService.remedy.create({ data: createRemedyDto });
  }

  async findRemedy(query: FindRemedyDto) {
    const { name, category } = query;
    return this.databaseService.remedy.findMany({
      where: { ...(name && { name: { contains: name } }), ...(category && { category: { id: category } }) },
    });
  }

  async findOneRemedy(id: number) {
    return this.databaseService.remedy.findUnique({ where: { id } });
  }

  async updateRemedy(id: number, updateRemedyDto: Prisma.RemedyUpdateInput) {
    return this.databaseService.remedy.update({ where: { id }, data: updateRemedyDto });
  }

  async removeRemedy(id: number) {
    return this.databaseService.remedy.delete({ where: { id } });
  }

  async addManufacturer(addManufacturerDto: Prisma.ManufacturerCreateInput) {
    return this.databaseService.manufacturer.create({ data: addManufacturerDto });
  }

  async findManufacturer(findManufacturerDto: Prisma.ManufacturerWhereInput) {
    return this.databaseService.manufacturer.findFirst({ where: findManufacturerDto });
  }

  async addCategory(addCategoryDto: Prisma.CategoryCreateInput) {
    return this.databaseService.category.create({ data: addCategoryDto });
  }

  async findCategory(findCategoryDto: Prisma.CategoryWhereInput) {
    return this.databaseService.category.findFirst({ where: findCategoryDto });
  }

  async addForm(addFormDto: Prisma.FormCreateInput) {
    return this.databaseService.form.create({ data: addFormDto });
  }

  async findForm(findFormDto: Prisma.FormWhereInput) {
    return this.databaseService.form.findFirst({ where: findFormDto });
  }

  async addIngredient(addIngredientDto: Prisma.IngredientsCreateInput) {
    return this.databaseService.ingredients.create({ data: addIngredientDto });
  }

  async findIngredient(findIngredientDto: Prisma.IngredientsWhereInput) {
    return this.databaseService.ingredients.findFirst({ where: findIngredientDto });
  }

  async addFormulation(addFormulationDto: Prisma.FormulationCreateInput) {
    return this.databaseService.formulation.create({ data: addFormulationDto });
  }
}
