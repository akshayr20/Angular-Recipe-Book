import { Ingredient } from '../shopping-list/model/ingredient.model';

export class Recipe {
  id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Array<Ingredient>;

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Array<Ingredient>
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
