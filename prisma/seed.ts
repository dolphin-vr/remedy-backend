import { RemedyService } from '../src/remedy/remedy.service';
import { DatabaseService } from '../src/database/database.service';
import medicines from '../assets/medications5.json';

import fs from 'fs/promises';
import path from 'path';

interface Formulation {
  'Active ingredient': string;
  Doze: number;
  unit: string;
}
interface Remedy {
  'Commercial name': string;
  Manufacturer: string;
  Form: string;
  'Amount in package': number;
  Category: string;
  'image URL': string;
  'Active ingredients': Formulation[];
}

const writeList = (fn: string, text: string) => {
  const filePath = path.resolve('assets', `${fn}.txt`);
  fs.writeFile(filePath, text);
};

const databaseService = new DatabaseService();
const remedyService = new RemedyService(databaseService);

const manufacturer = () => {
  const arrManufacturers = [...new Set(medicines.map(el => el['Manufacturer']))];
  arrManufacturers.forEach(async name => await remedyService.addManufacturer({ name }));

  const text = arrManufacturers.join('\n');
  writeList('manufacturer', text);
};

const category = () => {
  const arrCategory = [...new Set(medicines.map(el => el['Category']))];
  arrCategory.forEach(async name => await remedyService.addCategory({ name }));

  const text = arrCategory.join('\n');
  writeList('category', text);
};

const form = () => {
  const arrForm = [...new Set(medicines.map(el => el['Form']))];
  arrForm.forEach(async name => await remedyService.addForm({ name }));

  const text = arrForm.join('\n');
  writeList('form', text);
};

const ingredients = () => {
  const arrAll: string[] = [];
  medicines.forEach(el => el['Active ingredients'].forEach(a => arrAll.push(a['Active ingredient'])));
  const arrIngredients = [...new Set(arrAll)];
  arrIngredients.forEach(async name => await remedyService.addIngredient({ name }));

  const text = arrIngredients.join('\n');
  writeList('ingredients', text);
};

const remedies = () => {
  medicines.forEach(async el => {
    const manufacturer = await remedyService.findManufacturer({ name: el['Manufacturer'] });
    const form = await remedyService.findForm({ name: el['Form'] });
    const category = await remedyService.findCategory({ name: el['Category'] });

    if (manufacturer && form && category) {
      const remedy = await remedyService.addRemedy({
        name: el['Commercial name'],
        amount: el['Amount in package'],
        photo: el['image URL'],
        manufacturer: { connect: { id: manufacturer.id } },
        form: { connect: { id: form.id } },
        category: { connect: { id: category.id } },
      });
      el['Active ingredients'].forEach(async a => {
        const ingredient = await remedyService.findIngredient({ name: a['Active ingredient'] });
        if (ingredient) {
          await remedyService.addFormulation({
            remedy: { connect: { id: remedy.id } },
            ingredient: { connect: { id: ingredient.id } },
            doze: a['Doze'],
            unit: a['unit'],
          });
        }
      });
    }
  });
};

function main() {
  manufacturer();
  category();
  form();
  ingredients();
  remedies();
}

main();
