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

## Работа с текущим репозиторием

Для расширения функционала и разработки запускать проект через `yarn dev` и в `src/dev` лежит текущий экземпляр и он использует локальную версию библиотеки.

Также установлены дополнительные библиотеки для обертки приложения в electron для автономной работы и запуска только исполняемого файла.

## Реализованный функционал

- Адаптивный дизайн и возможность динамического изменения размера окон (панелей)
- 7 хуков для контроля изменения значения переменной
- Добавление Markdown документации
- Обработка ошибок
- Поддержка тем из Mantine