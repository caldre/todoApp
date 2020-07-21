import React from "react";
import Todo from "../Todo";
import renderer from "react-test-renderer";


// Mock data for testing
const props = { id: 43124321, name: "Go to the supermarket", complete: false };
const removeTodo = () => {};
const toggleCompleteStatus = () => {};

test("Todo component renders", () => {
  const component = renderer.create(
    <Todo
      key={props.id}
      todoDetails={props}
      toggleCompleteStatus={toggleCompleteStatus}
      removeTodo={removeTodo}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Check that component renders with correct default props", () => {
  const testRenderer = renderer.create(
    <Todo
      key={props.id}
      todoDetails={props}
      toggleCompleteStatus={toggleCompleteStatus}
      removeTodo={removeTodo}
    />
  );
  const testInstance = testRenderer.root;

  expect(testInstance.findByType(Todo).props.todoDetails.id).toBe(43124321);
  expect(testInstance.findByType(Todo).props.todoDetails.name).toBe(
    "Go to the supermarket"
  );
  expect(testInstance.findByType(Todo).props.todoDetails.complete).toBe(false);
  // expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
});
