import extendParam from './extend-param/extend-param';
import getParameterByName from './get-parameter-by-name/get-parameter-by-name';
import initParams from './init-params/init-params';
import pathVariable from './path-variable/path-variable';
import urlParams from './url-params/url-params';

export default {
  extendParam, getParameterByName, initParams, pathVariable, urlParams
} as const;
