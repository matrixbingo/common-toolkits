const mapByKey = (list: { [K: string]: any }[], k = 'id') => list.map((i) => i[k]);

export default mapByKey;
