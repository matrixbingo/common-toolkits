import React from 'react';
import { YForm } from 'aem-ui-forms';
import { YFormItemsType } from 'aem-ui-forms/lib/YForm/ItemsType';
import { SearchProps } from 'antd/lib/input';
import { CodeEditorCard, CodeEditorCardProps, DatePickerFormat, DatePickerFormatProps, InputAddonBefore, InputAddonBeforeProps, InputRange, InputRangeProps, InputSearch, InputSelectValue, InputSelectValueProps, InputStringNumber, InputStringNumberProps, RangePickerFormat, RangePickerFormatProps } from 'aem-ui';
import 'antd/dist/antd.css';

declare module 'aem-ui-forms/lib/YForm/ItemsType' {
  export interface YFormItemsTypeDefine {
    datePickerFormat: { componentProps?: DatePickerFormatProps };
    rangePickerFormat: { componentProps?: RangePickerFormatProps };
    inputStringNumber: { componentProps?: InputStringNumberProps };
    inputRange: { componentProps?: InputRangeProps };
    inputAddonBefore: { componentProps?: InputAddonBeforeProps };
    inputSelectValue: { componentProps?: InputSelectValueProps };
    inputSearch: { componentProps?: SearchProps };
    codeEditorCard: { componentProps?: CodeEditorCardProps };
  }
}

export const itemsType: YFormItemsType = {
  datePickerFormat: { component: <DatePickerFormat /> },
  rangePickerFormat: { component: <RangePickerFormat /> },
  inputStringNumber: { component: <InputStringNumber /> },
  inputRange: { component: <InputRange /> },
  inputAddonBefore: { component: <InputAddonBefore /> },
  inputSelectValue: { component: <InputSelectValue /> },
  inputSearch: { component: <InputSearch /> },
  codeEditorCard: { component: <CodeEditorCard /> },
};

YForm.Config({ itemsType });
