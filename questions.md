1: What is the difference between Component and PureComponent? Give an example where it might break my app.

If you create a base class component you need to extend from Component class and to create a Pure Component you need to extend from PureComponent class.

PureComponent
Executes a shallow comparison but you need to call manually forceUpdate when data updates
PureComponent implements shouldComponentUpdate lifecycle method.

PureComponent since do shallow comparison have an state with nested objects of array and you mutate that data the shallow comparison may not detect those changes and might be not re render with those changes.

2: Context + ShouldComponentUpdate might be dangerous. Why is that?
Can execute undesired re renders and since algo we have shouldComponentUpdate lifecycle it's context state updates, probably shouldComponentUpdate will not behave as we are expecting
Since we can have undesired re renders this will cause performance issue in our app

3: Describe 3 ways to pass information from a component to its PARENT.
- Using Context API to consume the data in any of the components
- Implementing a state management library like redux, zustand, etc
- Create a parent componet that has a callback function using useState hook and send as a prop the function to the child

const Child = ({setData}) => {
    const onChange = (data) => setData(data)
}

const Parent = () => {
    const [data, setData] = useState();


    return (
        <Child setData={setData}>
    )

}

4: Give 2 ways to prevent components from re-rendering.
- For functional components using React.memo, useMemo and useCallback hooks can prevent re renders
- For class based component using a PureComponent class

5: What is a fragment and why do we need it? Give an example where it might break my app.
You can use a fragment like this <React.Fragment></React.Fragment> and exist a shortcut <></>
It's a lightweight wrapper to wrap several childrens avoiding add extra nodes to the DOM

For instance if you have something like this it will throw you an error

<p>Hello</p>
<p>Hello 2</p>

To fix this you can use a fragment, and it's not necessary to use a div as a wrapper
<>
    <p>Hello</p>
    <p>Hello 2</p>
</>
Use fragment will helps us to avoid add extra nodes to the dom, cleaner syntax and also in performance.

I think you can't use a fragment if you have to put a ref to the fragment, honestly I have never try to do it.

6: Give 3 examples of the HOC pattern.
- For data fetching
- In case that components has a similar behaviour, for instance show componets in hover you can create a HOC as a wrapper

function withHover(WrappedComponent) {
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseEnter}>
        <WrappedComponent {...props} isHovered={isHovered} />
    </div>
  };
}

const Component1 = ({ isHovered }) => {
  return (
    <>
      <p style={{ backgroundColor: isHovered ? "blue" : "white" }}>hello</p>
    </>
  );
};

const Component2 = ({ isHovered }) => {
  return (
    <>
      <p style={{ backgroundColor: isHovered ? "green" : "yellow" }}>hello 2</p>
    </>
  );
};

const Component1WithHover = withHover(Component1);
const Component2WithHover = withHover(Component2);

- For styling

const withStyles = (WrappedComponent) => {
  const StyledComponent = ({ isFlex, ...props }) => {
    const className = isFlex ? 'flex-class' : '';

    return <WrappedComponent {...props} className={className} />;
  };

  return StyledComponent;
};

const Test = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const StyledItem = withStyle(Test);

7: What's the difference in handling exceptions in promises, callbacks and async...await?
- In promises to handle errors you can catch the erros in catch() method

Promise
.then()
.catch() // You can handle exception here

- Callback
myFunction((error, cb, cbError) => {
  if (error) {
    cbError() // handle exceptions here
  } else {
    cb()
  }
});

- Async/Await

try {
    console.log('hello world')
} catch(error) {
    console.log(error) // You can handle exception in this catch block
}

8: How many arguments does setState take and why is it async.
There is 2 ways for call setState

setState(newState, callback) or setState(functionUpdate, callback)

setStae it's async because it prevents side effects, and also use event loop pattern

9: List the steps needed to migratea Class to Function Component.
- Identify local state from Class Component and migrate to useState
- Identify lifecycle to migrate to useEffect hook
- Migrate class method to standalone functions
- Handle props
- Take HTML and put in the render method of the functional component
- Test that it's working as expected
- Optimization in case that the migration affect the performance

10: List a few ways styles can be used with components.
- Styled components (Emotion)
- CSS modules
- Inline styles
- Use a CSS library like bootstrap, tailwind
- CSS Library with sass or less

11: How to render an HTML string coming from the server.
Sanitize HTML this will help us yo prevent XSS attacks and to render we can use dangerouslySetInnerHTML in a wrapper

<div
    dangerouslySetInnerHTML={{ __html: cleanHtml }}
/>