/**
 * Unit tests for the submit rubric action utilizing the useFetch hook.
 */
import { render, fireEvent } from "@testing-library/react";
import {
  handleSubmitRubric,
  handleExistingRubric,
} from "../../features/rubricBuilder/RubricBuilder";
import formatDate from "../../utils/formatDate";
import React from "react";

// mock external functions
const setModalMessage = jest.fn();
const setModalTitle = jest.fn();
const setModalChoices = jest.fn();
const openModal = jest.fn();
const closeModal = jest.fn();
const setRubric = jest.fn();
const postRubric = jest.fn();
const putRubric = jest.fn();
let postRubricResponse = { success: false, error: "" };
let putRubricResponse = { success: false, error: "" };

// mock useFetch hook
jest.mock("../../hooks/useFetch.ts", () => ({
  useFetch: jest.fn(() => ({
    postRubricResponse,
    putRubricResponse,
    fetchData: jest.fn(),
  })),
}));
