## Заголовок документации про кнопку
Список приемуществ данной кнопки

- приемущество 1

- приемущество 2

### Пример описания компоненты
```
//Render
return (
    <div>
        <Button
        color={colorValue}
        radius={radiusValue}
        uppercase={uppercaseValue}
        compact={checkboxValue.includes('Compact')}
        loading={checkboxValue.includes('Loading')}
        disabled={checkboxValue.includes('Disabled')}
        variant={variantValue.toLowerCase() as ButtonProps['variant']}
        size={sliderMarks.find(item => item.value === sizeValue)?.label as MantineSize}
        >
            {stringControl}
        </Button>
    </div>
);
```