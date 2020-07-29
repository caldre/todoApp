import React from "react";
import Todo from "../Todo/Todo";
import renderer, { act } from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const props = { id: 43124321, name: "Go to the supermarket", complete: false };
const removeTodo = () => {};
const toggleCompleteStatus = () => {};
const setTheme = () => {};

configure({ adapter: new Adapter() });

test("Todo component renders", () => {
  const component = renderer.create(
    <Todo
      key={props.id}
      todoDetails={props}
      toggleCompleteStatus={toggleCompleteStatus}
      removeTodo={removeTodo}
      setTheme={setTheme}
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
      setTheme={setTheme}
    />
  );
  const testInstance = testRenderer.root;

  expect(testInstance.findByType(Todo).props.todoDetails.id).toBe(43124321);
  expect(testInstance.findByType(Todo).props.todoDetails.name).toBe(
    "Go to the supermarket"
  );
  expect(testInstance.findByType(Todo).props.todoDetails.complete).toBe(false);
});

test("Changes state with mouse events", () => {
  const component = renderer.create(
    <Todo
      key={props.id}
      todoDetails={props}
      toggleCompleteStatus={toggleCompleteStatus}
      removeTodo={removeTodo}
      setTheme={setTheme}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the event onMouseOver
  act(() => {
    tree.props.onMouseOver();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // manually trigger the event onMouseLeave
  act(() => {
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test("renders two buttons", () => {
  const wrapper = shallow(
    <Todo
      key={props.id}
      todoDetails={props}
      toggleCompleteStatus={toggleCompleteStatus}
      removeTodo={removeTodo}
      setTheme={setTheme}
    />
  );
  expect(wrapper.find("button").length).toBe(2);
});
