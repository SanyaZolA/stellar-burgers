import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const params = useParams();

  const { ingredients, isLoading } = useSelector(
    (state: RootState) => state.ingredients
  );

  if (isLoading) {
    return <Preloader />;
  }

  const ingredientData = ingredients.filter(
    (i: TIngredient) => i._id === params.id
  )[0];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
