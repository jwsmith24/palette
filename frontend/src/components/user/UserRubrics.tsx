/*
Main view for the Rubric Builder feature.
 */

import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import CriteriaInput from '../rubric-builder/CriteriaInput.tsx';
import Dialog from '../util/Dialog.tsx';
import Header from '../util/Header.tsx';
import Footer from '../util/Footer.tsx';
import { Rubric } from '../../models/types/rubric.ts';
import createRubric from '../../models/Rubric.ts';
import { Criteria } from '../../models/types/criteria.ts';
import createCriterion from '../../models/Criteria.ts';

export default function RubricBuilder(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col justify-between w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      {/* Sticky Header with Gradient */}
      <Header />

      <h1 className="font-extrabold text-2xl mb-2 text-center">
        <p>Rubrics Page Coming Soon...</p>
      </h1>

      {/* Sticky Footer with Gradient */}
      <Footer />
    </div>
  );
}
