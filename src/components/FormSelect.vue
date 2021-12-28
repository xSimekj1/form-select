<template>
    <div :class="getOptionClass()">
        <div :class="$options.CLASS_NAME.field">
            <div :class="$options.CLASS_NAME.wrapper">
                <input
                    type="hidden"
                    :name="input.name"
                    :value="localValue"
                >
                <div
                    v-if="input.label"
                    :class="$options.CLASS_NAME.label"
                >
                    <!--This should NOT use v-text since <form-item> doesn't
                then '*' is w/o space-->
                    {{ translate(input.label) }}
                </div>
                <v-select
                    ref="select"
                    v-model="localValue"
                    :label="optionLabel"
                    :clearable="clearable"
                    :disabled="isDisabled"
                    :filter="filter"
                    :filterable="isFilterable"
                    :no-drop="isDisabled"
                    :options="options"
                    :placeholder="placeholder"
                    :push-tags="pushTags"
                    :reduce="reduce"
                    :searchable="isSearchable"
                    :selectable="selectable"
                    :taggable="taggable"
                    @input="onInput"
                    @search="onSearch"
                    @search:blur="onBlur"
                    @search:focus="onFocus"
                >
                    <template #option="option">
                        <slot
                            name="option"
                            :option="option"
                        ></slot>
                    </template>
                    <template #selected-option="option">
                        <slot
                            name="selected-option"
                            :option="option"
                        ></slot>
                    </template>
                    <template
                        v-if="!isDisabled"
                        #open-indicator="{ attributes }"
                    >
                        <span
                            v-bind="attributes"
                            :class="$options.CLASS_NAME.arrowIcon"
                        >
                            <slot name="select-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 512 512"
                                >
                                    <!--eslint-disable-next-line max-len-->
                                    <path d="M19.778 118.585c-12.913 12.901-13.419 33.512-1.553 47.037l1.553 1.648 236.219 236.231 236.219-236.231c13.454-13.442 13.454-35.243 0-48.685-12.901-12.913-33.512-13.419-47.036-1.553l-1.648 1.553-187.535 187.522-187.535-187.523c-12.901-12.913-33.512-13.419-47.036-1.553l-1.648 1.553z" />
                                </svg>
                            </slot>
                        </span>
                    </template>
                    <template #no-options="{ search, searching, loading }">
                        <slot
                            name="no-options"
                            :search="search"
                            :searching="searching"
                            :loading="loading"
                        ></slot>
                    </template>
                </v-select>
                <form-errors
                    v-if="showFormErrors"
                    :form-errors="formErrors"
                ></form-errors>
                <form-errors
                    v-else
                    :form-errors="errors"
                ></form-errors>
            </div>
        </div>
    </div>
</template>

<script>
import VSelect from 'vue-select';
import { FormItem } from '@odyzeo/form-item';
import slugify from 'slugify';

export function slugThat(that) {
    if (typeof that !== 'string') return '';
    return slugify(that, {
        replacement: ' ',
        remove: null,
        lower: true,
    });
}

export default {
    name: 'FormSelect',
    components: { VSelect },
    extends: FormItem,
    props: {
        optionLabel: {
            type: String,
            default: 'name',
        },
        options: {
            type: Array,
            required: true,
        },
        value: {
            type: [String, Number, Object],
            default: null,
        },
        startWith: {
            type: Boolean,
            default: false,
        },
        /**
         * For v-select
         */
        clearable: {
            type: Boolean,
            default: false,
        },
        reduce: {
            type: Function,
            default: (option) => option.id,
        },
        searchable: {
            type: Boolean,
            default: false,
        },
        taggable: {
            type: Boolean,
            default: false,
        },
        pushTags: {
            type: Boolean,
            default: false,
        },
        prefill: {
            type: Boolean,
            default: false,
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        selectable: {
            type: Function,
            default: () => true,
        },
    },
    data() {
        return {
            isFocused: false,
            localValue: null,
            showErrors: false,
        };
    },
    computed: {
        hasErrors() {
            return this.formErrors?.length > 0;
        },
        isDisabled() {
            return this.input.disabled;
        },
        isFilled() {
            return this.localValue;
        },
        isFilterable() {
            return this.startWith || this.filterable;
        },
        isRequired() {
            return this.input.required;
        },
        isSearchable() {
            return this.startWith || this.searchable;
        },
        placeholder() {
            if (!this.input.placeholder) return null;
            return this.translate(this.input.placeholder)
                ? this.translate(this.input.placeholder)
                : this.input.placeholder;
        },
    },
    watch: {
        formErrors(e) {
            if (e.length > 0) {
                this.showErrors = true;
            }
        },
        value(v) {
            this.init(v);
            this.showErrors = false;
        },
    },
    created() {
        this.init(this.value);
        this.initClassName();
    },
    methods: {
        init(value) {
            this.localValue = value;
            this.showErrors = this.hasErrors;
        },
        initClassName() {
            this.$options.CLASS_NAME = {
                arrowIcon: this.getClassName('arrow-icon'),
                element: this.getClassName('element'),
                field: this.getClassName('field'),
                input: this.getClassName('input'),
                label: this.getClassName('label'),
                text: this.getClassName('text'),
                wrapper: this.getClassName('wrapper'),
            };
        },
        getClassName(element = null, modifier = null) {
            let className = 'form-select';
            if (element) {
                className = `${className}__${element}`;
            }
            if (modifier) {
                className = `${className}--${modifier}`;
            }
            return className;
        },
        getOptionClass() {
            return {
                [this.className]: this.className,
                [this.getClassName(null)]: true,
                [this.getClassName(null, 'disabled')]: this.isDisabled,
                [this.getClassName(null, 'error')]: this.showFormErrors,
                [this.getClassName(null, 'filled')]: this.isFilled,
                [this.getClassName(null, 'focused')]: this.isFocused,
                [this.getClassName(null, 'prefill')]: this.prefill,
                [this.getClassName(null, 'required')]: this.isRequired,
            };
        },
        onBlur() {
            this.isFocused = false;
            this.$emit('blur', this.localValue);
        },
        onFocus() {
            this.isFocused = true;

            if (this.prefill) {
                this.$refs.select.search = this.localValue ?? '';
            }

            this.$emit('focus', this.localValue);
        },
        onSearch(value, loading) {
            this.$emit('search', value, loading);
        },
        onInput(value) {
            this.showErrors = false;
            this.$emit('input', value);
        },
        filter(options, search) {
            if (!this.isFilterable) return options;

            if (this.startWith) {
                return search.length
                    ? options.filter((o) => slugThat(o[this.optionLabel])
                        .startsWith(slugThat(search)))
                    : options;
            }

            return search.length
                ? options.filter((o) => slugThat(o[this.optionLabel])
                    .includes(slugThat(search)))
                : options;
        },
    },
};
</script>

<style lang="less">
@import '../less/form-select.less';
</style>
