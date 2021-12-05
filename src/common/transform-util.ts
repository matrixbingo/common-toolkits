import { forIn, isObject } from 'lodash';
import { getField, omitFormat } from './object-util';
import { LabeledValue } from 'antd/lib/select'

export type Raw = string | number;

export type ObjectType = Record<Raw, any>;

export type ObjectTypeArray = Record<Raw, any>[];

type SelectValueType = string | string[] | number | number[] | LabeledValue | LabeledValue[];

type SelectType = {value: SelectValueType, label: Raw | any};

type SelectDataSourceType = SelectType[];

/**
 * to SelectDataSourceType
 */
 export const select = {
  /** *
   * JSON 格式转换 select等组件用, 支持path路径
   * list: [{ a: "aa", b: "bb", c: { c1: "c11", c2: "c12" } }, { a: "AA", b: "BB", c: { c1: "C11", c2: "C12" } }]
   * format: {value: "a", label: "c.c1"}
   * return : [ {value: 'aa', label: 'c11'}, {value: 'AA', label: 'C11'} ]
   */
   formatArray: (list: any[],  format: Record<string, string>): SelectDataSourceType => {
    const rs: SelectDataSourceType = [];
    if (Array.isArray(list) && list.length > 0) {
      return list.reduce((arr, next) => {
        arr.push(omitFormat(next, format));
        return arr;
      }, rs);
    }
    return rs;
   },
   /**
    * 
    * @param obj  {a: "aa", b: "bb"}
    * @param format {value: "label"}
    * @returns 
    */
   formatObject: (obj: any,  format: Record<string, string>): SelectDataSourceType => {
    const item = {k: '', v: ''};
    forIn(format, (value, key) => {
      item.k = key;
      item.v = value;
    });
    const rs: SelectDataSourceType = [];
    if(isObject(obj)){
      Object.keys(obj).forEach((k)=>{
        const o: any = {};
        o[item.k] = k;
        o[item.v] = obj[k];
        rs.push(o);
      });
    };
    return rs;
   },
  /** *
   * JSON 格式转换 select等组件用
   */
   formatArrayAndObject : (objs: any, format: Record<string, string>): SelectDataSourceType => {
    return Array.isArray(objs)? select.formatArray(objs, format) : select.formatObject(objs, format);
  },
};

export const obj = {

};