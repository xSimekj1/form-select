# @odyzeo/form-select

Simple input select Vue.js component. 
Form-select wrapper form-item select built on top of vue-select package

## Installation

### npm

```
npm install --save @odyzeo/form-select
```

### yarn

```
yarn add @odyzeo/form-select
```

Import component in your where you want to use it and register it.
Remember to also use FormItem plugin.

```
import FormItem from '@odyzeo/form-item';
import FormRadio from '@odyzeo/form-select';

Vue.use(FormItem);

export default {
    components: {
        FormSelect,
    },
}
```

Import styles or make your own.

```
import '@odyzeo/form-select/dist/form-select.css';
```

## Usage

```
<template>
    <form-select
        :input="select"
        v-model="value"
        :options="options"
    ></form-radio>
</template>
```

```
<script>
import FormSelect from './components/FormSelect';

export default {
    name: 'App',
    components: {
        FormSelect,
    },
    data() {
        return {
            select: {
                name: 'country_id',
            },
            value: 3,
            options: [
                {
                    id: 1,
                    name: 'Czech Republic',
                    code: 'CZ',
                },
                {
                    id: 2,
                    name: 'Poland',
                    code: 'PL',
                },
                {
                    id: 3,
                    name: 'Slovak Republic',
                    code: 'SK',
                },
            ],
        };
    },
};
</script>
```

## Props

Since `FormSelect` extends `FormItem` see [@odyzeo/form-item](https://www.npmjs.com/package/@odyzeo/form-item) for props.

Additional or overwritten props for `FormSelect`

### input - required
| Property name | Type | Default value | Description |
| ------------- | ---- | ------------- | ----------- |
| `className` | string | | Add custom class |
| `clearable` | boolean | `false` | Add clear button |
| `label` | string | | Label text over element  |
| `filterable` | boolean | `false` | Enable results filtering |
| `required` | boolean | `false` | If value is required |
| `prefill` | boolean | `false` | Set prefilled flag, value have to be prefilled set manually  |
| `searchable` | boolean | `false` | Enable value results search |
| `start-with` | boolean | `false` | Enable value results search and filter, filter only values starting with searched value   |
| `option-label` | string | `name` | Change of object key, that will be used to display results in dropdown options |
| `options` | array | | Array of select options [{ id: 'value to emit', name: 'default text to show'}] |


## Slots
Using new slot syntax since 2.6.0+. [Check it out](https://vuejs.org/v2/guide/components-slots.html).

### option
```vue
<template #option="{ option }">
  {{ option.code }} /
  {{ option.name }}
</template>

<template #selected-option="{ option }">
  {{ option.code }} /
  {{ option.name }}
</template>

<template #select-icon>
    <span class="custom-icon"></span>
</template>


<template #no-options="{ search, searching, loading }">
    No results
</template>
```

## Events
Component emits these events:
- `@input` - Triggered when the selected value changes. Emits value of element.
- `@search` - Triggered anytime the search string changes. The event is passed with two parameters: the search string, and a function that accepts a boolean parameter to toggle the loading state.
- `@focus` - Triggered when element gains focus. The dropdown will open immediately before this event is triggered. Emits value of element.
- `@blur` - Triggered when element loses focus. The dropdown will close immediately before this event is triggered. Emits value of element.

## Development

```
npm run serve
```
