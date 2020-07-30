import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "../Todo/Todo";
import renderer from "react-test-renderer";

const expectedId = 12341234;
let props = { id: expectedId, name: "Go to the supermarket", complete: false };

test("Todo component renders", () => {
  const component = render(<Todo todoDetails={props} />);

  expect(component.container.firstChild).toMatchSnapshot();
});

test("Check that component renders with correct default props", () => {
  const testRenderer = renderer.create(<Todo todoDetails={props} />);
  const testInstance = testRenderer.root;

  expect(testInstance.findByType(Todo).props.todoDetails.id).toBe(expectedId);
  expect(testInstance.findByType(Todo).props.todoDetails.name).toBe(
    "Go to the supermarket"
  );
  expect(testInstance.findByType(Todo).props.todoDetails.complete).toBe(false);
});

test("Toggles delete-icon with mouse hover", () => {
  const component = render(<Todo key={props.id} todoDetails={props} />);
  const todoWrapper = component.getByTestId("todo-wrapper");
  const deleteIcon = component.getByTestId("delete-icon");

  expect(deleteIcon.classList.contains("fa-window-close")).toBe(false);
  fireEvent.mouseOver(todoWrapper);
  expect(deleteIcon.classList.contains("fa-window-close")).toBe(true);
  fireEvent.mouseLeave(todoWrapper);
  expect(deleteIcon.classList.contains("fa-window-close")).toBe(false);
});

test("Toggle button is called exactly once with a correct argument", () => {
  const mockToggle = jest.fn();
  const component = render(
    <Todo todoDetails={props} toggleCompleteStatus={mockToggle} />
  );
  const toggleComplete = component.getByTestId("toggle");

  expect(mockToggle).toHaveBeenCalledTimes(0);
  fireEvent.click(toggleComplete);
  expect(mockToggle).toHaveBeenCalledTimes(1);
  expect(mockToggle).toHaveBeenCalledWith(expectedId);
});

test("Delete button is called exactly once with a correct argument", () => {
  const mockDelete = jest.fn();
  const component = render(
    <Todo key={props.id} todoDetails={props} removeTodo={mockDelete} />
  );
  const deleteButton = component.getByTestId("delete");

  expect(mockDelete).toHaveBeenCalledTimes(0);
  fireEvent.click(deleteButton);
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(expectedId);
});
