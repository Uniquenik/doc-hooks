Library for simple documentation react components 

# Get started

### 0) Create project

### 1) Configure entry point

In `App.tsx` add component `<ReactDocHooks/>` and init components by function `createStories`

Example:
```
const stories = createStories([
    { name: 'Button', component: ButtonStory, markdownFile: ButtonMD },
    { name: 'Input', component: InputStory, markdownString: InputStoryMarkdown },
]);

export const App = () => (
    <>
        <ReactDocHooks stories={stories} />
    </>
);
```
### 2) Add hooks

Just import hooks from library and configure some parameters

Example:
```
const [stringControl] = useStringControl({
    defaultValue: 'Name',
    name: 'String control',
    rowsCount: 1,
  });
  
return (
      <button>
        {stringControl}
      </button>
  );
```


### ... and start project!



https://github.com/Uniquenik/doc-hooks/assets/82930056/5ce289ff-21e3-44fc-901e-80d5fca72e3d
