import FormSelect from '../components/FormSelect';

const Plugin = {
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return;
        }

        /**
         * Functions
         */
        function subscribeFormSelect(item) {
            Plugin.activeItems.push(item);
        }

        function unsubscribeFormSelect(item) {
            const index = Plugin.activeItems.indexOf(item);

            if (index !== -1) {
                Plugin.activeItems.splice(index, 1);
            }
        }

        function callFunctionOnFormSelect(name, functionName) {
            Plugin.activeItems.filter((item) => item.groupName !== '' && item.groupName === name)
                .forEach((item) => {
                    item[functionName]();
                });
        }

        function getErrors(name) {
            const errors = [];

            Plugin.activeItems.filter((item) => item.groupName !== '' && item.groupName === name)
                .forEach((item) => {
                    if (item.errors.length > 0) {
                        errors.push(...item.errors);
                    }
                });

            return errors;
        }

        /**
         * Main logic
         */
        const defaultClassName = 'form-select';
        const defaultComponentName = 'form-select';
        const defaultTrans = (key) => key;
        const {
            className = defaultClassName,
            componentName = defaultComponentName,
            trans = defaultTrans,
        } = options;

        this.installed = true;
        this.event = new Vue();
        this.className = className;
        this.componentName = componentName;
        this.activeItems = [];

        this.event.$on('subscribe', subscribeFormSelect);
        this.event.$on('unsubscribe', unsubscribeFormSelect);

        /**
         * Plugin API
         */
        // eslint-disable-next-line
        Vue.prototype.$FormSelect = {
            // methods
            validate(name) {
                callFunctionOnFormSelect(name, 'validate');
            },
            clear(name) {
                callFunctionOnFormSelect(name, 'clear');
            },
            getErrors(name) {
                return getErrors(name);
            },
            hasErrors(name) {
                return getErrors(name).length > 0;
            },

            className,

            // properties
            event: this.event,

            // methods
            trans,
        };

        /**
         * Sets custom component name (if provided)
         */
        Vue.component(this.componentName, FormSelect);
    },
};

export default Plugin;
