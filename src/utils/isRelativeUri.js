const isRelativeUri = uri => !/^(f|ht)tps?:\/\//i.test(uri);

export default isRelativeUri;
