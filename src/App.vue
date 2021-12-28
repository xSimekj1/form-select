<template>
    <div
        id="app"
        class="app"
    >
        <div class="container">
            <h1 class="text-center">
                Form Select
            </h1>

            <form
                ref="form"
                novalidate
                @submit.prevent="submit"
            >
                <form-select
                    v-model="value"
                    :input="settings.input"
                    :class-name="settings['class-name']"
                    :clearable="settings.clearable"
                    :filterable="settings.filterable"
                    :form-errors="formErrors.country_id"
                    :prefill="settings.prefill"
                    :group-name="$options.GROUP_NAME"
                    :searchable="settings.searchable"
                    :start-with="settings['start-with']"
                    :option-label="settings['option-label']"
                    :options="countries"
                >
                    <template
                        v-if="hasCustomOptionLabel"
                        #option="{ option }"
                    >
                        {{ option.code }} /
                        {{ option.name }}
                    </template>
                    <template
                        v-if="hasCustomOptionLabel"
                        #selected-option="{ option }"
                    >
                        {{ option.code }} /
                        {{ option.name }}
                    </template>
                    <template
                        v-if="hasCustomArrow"
                        #select-icon
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                        >
                            <!--eslint-disable-next-line max-len-->
                            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                        </svg>
                    </template>
                </form-select>

                <button
                    class="btn"
                    :class="{'active' : settings.input.disabled }"
                    @click.prevent="toggleDisabled"
                >
                    disabled
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings.clearable }"
                    @click.prevent="toggleClearable"
                >
                    clearable
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings.searchable }"
                    @click.prevent="toggleSearchable"
                >
                    Searchable
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings.filterable }"
                    @click.prevent="toggleFilterable"
                >
                    Filterable
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings['start-with'] }"
                    @click.prevent="toggleStartWith"
                >
                    Start with
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings.prefill }"
                    @click.prevent="togglePrefill"
                >
                    Prefill
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings['class-name'] }"
                    @click.prevent="toggleClassName"
                >
                    custom class
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings.input.placeholder }"
                    @click.prevent="togglePlaceholder"
                >
                    Placeholder
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings.input.label }"
                    @click.prevent="toggleLabel"
                >
                    Label
                </button>

                <button
                    class="btn"
                    :class="{'active' : settings['option-label'] === 'code' }"
                    @click.prevent="toggleOptionLabel"
                >
                    Custom option label
                </button>

                <button
                    class="btn"
                    :class="{'active' : hasCustomOptionLabel }"
                    @click.prevent="toggleCustomOptionLabel"
                >
                    Custom option label (slots)
                </button>

                <button
                    class="btn"
                    :class="{'active' : hasErrors }"
                >
                    Validate form
                </button>

                <button
                    class="btn"
                    :class="{'active' : !hasErrors }"
                    @click.prevent="clear"
                >
                    Clear form
                </button>

                <button
                    class="btn"
                    :class="{'active' : hasCustomArrow }"
                    @click.prevent="toggleCustomArrow"
                >
                    Custom arrow icon
                </button>
            </form>

            <h3>In Template:</h3>
            <div class="result-code">
                <pre>{{ result }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
import FormSelect from './components/FormSelect';
import { parseToHTML } from '@/helpers';

export default {
    GROUP_NAME: 'group-name',
    ICON: `
    <template #select-icon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
        >
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
        </svg>
    </template>
`,
    SLOT_LABEL: `
    <template #option="{ option }">
        {{ option.code }} /
        {{ option.name }}
    </template>
    <template #selected-option="{ option }">
        {{ option.code }} /
        {{ option.name }}
    </template>
`,
    name: 'App',
    components: {
        FormSelect,
    },
    data() {
        return {
            className: 'text-bold',
            select: {
                name: 'country_id',
            },
            value: 3,
            formErrors: {},
            countries: [
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
            settings: {
                input: {
                    name: 'country_id',
                    placeholder: '',
                    disabled: false,
                    label: '',
                },
                'class-name': '',
                clearable: false,
                searchable: false,
                filterable: false,
                prefill: false,
                'start-with': false,
                'option-label': 'name',
            },
            hasErrors: false,
            hasCustomArrow: false,
            hasCustomOptionLabel: false,
        };
    },
    computed: {
        result() {
            const errors = this.hasErrors ? '    form-errors="formErrors"\n' : '';
            const params = parseToHTML(this.settings);
            const icon = this.hasCustomArrow ? this.$options.ICON : '';
            const slotLabel = this.hasCustomOptionLabel ? this.$options.SLOT_LABEL : '';
            return ''
                + '<form-select\n'
                + '    v-model="value"\n'
                + '    :options="countries"\n'
                + `${errors}`
                + `${params}`
                + '>'
                + `${slotLabel}`
                + `${icon}`
                + '</form-select>';
        },
    },
    methods: {
        submit() {
            this.hasErrors = true;
            this.formErrors = {
                country_id: ['Are you sure?'],
            };
        },
        clear() {
            this.hasErrors = false;
            this.$formItem.clear(this.$options.GROUP_NAME);
        },
        toggleClassName() {
            this.settings['class-name'] = this.settings['class-name'] ? '' : 'text-bold';
        },
        togglePlaceholder() {
            this.settings.input.placeholder = this.settings.input.placeholder ? '' : 'Choose a country...';
        },
        toggleLabel() {
            this.settings.input.label = this.settings.input.label ? '' : 'Country';
        },
        toggleClearable() {
            this.settings.clearable = !this.settings.clearable;
        },
        toggleSearchable() {
            this.settings.searchable = !this.settings.searchable;
        },
        toggleFilterable() {
            this.settings.filterable = !this.settings.filterable;
        },
        toggleStartWith() {
            this.settings['start-with'] = !this.settings['start-with'];
        },
        togglePrefill() {
            this.settings.prefill = !this.settings.prefill;
            if (this.settings.prefill) {
                this.value = 3;
            }
        },
        toggleDisabled() {
            this.settings.input.disabled = !this.settings.input.disabled;
        },
        toggleOptionLabel() {
            this.hasCustomOptionLabel = false;
            this.settings['option-label'] = this.settings['option-label'] !== 'name' ? 'name' : 'code';
        },
        toggleCustomOptionLabel() {
            this.hasCustomOptionLabel = !this.hasCustomOptionLabel;
            this.settings['option-label'] = 'name';
        },
        toggleCustomArrow() {
            this.hasCustomArrow = !this.hasCustomArrow;
        },
    },
};
</script>

<style lang="less">
@import './less/app.less';

.result-code {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;

    color: greenyellow;
    background-color: black;
}

pre {
    white-space: break-spaces;
}
</style>
