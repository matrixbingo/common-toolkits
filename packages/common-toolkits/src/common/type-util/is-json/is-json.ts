import assertIsJson from "./assert-is-json";

const isJSONObj = (obj: any) => {
	try {
        if (typeof obj !=='object') {
            throw false;
        } else if (!!obj) {
          let obj_keys = Object.keys(obj);
          let obj2 = JSON.parse(JSON.stringify(obj));
          let obj2_keys: string[] = Object.keys(obj2);
          while (obj2_keys.length) {
              let key = obj2_keys.shift() as string;
              if (typeof obj[key]==='object' &&  !!obj[key] && !isJSONObj(obj[key])) {
                  throw false;
              } else if (JSON.stringify(obj[key]) !== JSON.stringify(obj2[key])) {
                  throw false;
              }
              obj_keys.splice(obj_keys.indexOf(key), 1);
          }
          if (obj_keys.length) {
              throw false;
          }
        }
	} catch (err) {
		return false;
	}
	return true;
}

const isJSON = (v: any) => isJSONObj(v) || assertIsJson(v);

export default isJSON;
