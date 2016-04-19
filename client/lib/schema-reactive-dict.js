/**
 * reactive dict with schema
 */

import {ReactiveDict} from 'meteor/reactive-dict';
import _ from 'lodash';

export default class extends ReactiveDict {
    constructor(name, schema = {}) {
        // first argument may be schema
        if (typeof name === 'object') {
            schema = name;
            name = undefined;
        }
        super(name);
        this.schema = schema;
    }

    extendSchema(schema = {}) {
        _.keys(schema).forEach((key)=> {
            if (this.schema[key]) throw new Error('key ${key} is already defined in schema.');
        });
        _.extend(this.schema, schema);
    }

    set(key, value) {
        const match = this.schema[key];
        check(value, match);
        return super.set(key, value);
    }

    get(key) {
        if (!this.schema[key]) {
            throw new Error(`key ${key} is not defined in schema.`);
        }
        return super.get(key);
    }
}