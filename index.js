// npm
const R = require('ramda');

module.exports = {};

/**
 * @param {Object[]} An array of objects with an id variable
 * @returns {Object} An object that maps id to the full doc
 */
const objsWithIdsToObj = R.reduce((acc, val) => R.assoc(val.id, val, acc), {});
module.exports.objsWithIdsToObj = objsWithIdsToObj;

const ifFirst = (i, func) => R.ifElse(R.always(R.equals(i, 0)), func);
module.exports.isFirst = ifFirst;

const ifNotFirst = R.not(ifFirst);
module.exports.ifNotFirst = ifNotFirst;

const list = R.unapply(R.identity);
module.exports.list = list;

const pass = x => x;
module.exports.pass = pass;

const mapIndexed = R.addIndex(R.map);
module.exports.mapIndexed = mapIndexed;

const mapAccumIndexed = R.addIndex(R.mapAccum);
module.exports.mapAccumIndexed = mapAccumIndexed;

const reduceIndexed = R.addIndex(R.reduce);
module.exports.reduceIndexed = reduceIndexed;

const pretty = d => JSON.stringify(d, null, 2);
module.exports.pretty = pretty;

const log = R.tap(console.info);
module.exports.log = log;

const tapAndLog = func => R.tap(R.pipe(func, console.info));
module.exports.tapAndLog = tapAndLog;

const jsonLog = R.tap(R.pipe(pretty, console.info));
module.exports.jsonLog = jsonLog;

const listLog = R.tap(R.pipe(list, console.info));
module.exports.listLog = listLog;

const convergeAndMerge = funcs => R.converge(R.pipe(list, R.mergeAll), funcs);
module.exports.convergeAndMerge = convergeAndMerge;

const second = R.nth(1);
module.exports.second = second;

const addDefaultProp = R.curry((prop, def, target) => R.assoc(prop, R.propOr(def, prop, target))(target));
module.exports.addDefaultProp = addDefaultProp;

const denest = R.curry((prop, obj) => R.pipe(R.path([prop]), R.merge(obj), R.omit([prop]))(obj));
module.exports.denest = denest;

const updateIndex = R.curry((i, f, l) => R.over(R.lensIndex(i), R.always(f(l)), l));
module.exports.updateIndex = updateIndex;

const mapAppend = R.curry((f, p, val) => R.over(R.lensPath(p), R.append(f(val)), val));
module.exports.mapAppend = mapAppend;

const rename = R.curry((name, to, obj) => R.pipe(R.assoc(to, R.prop(name, obj)), R.omit([name]))(obj));
module.exports.rename = rename;

const assocPathMap = R.curry((p, f, t) => R.assocPath(p, f(t), t));
module.exports.assocPathMap = assocPathMap;

const custMapAccumIndexed = R.curry((fAcc, fMap, init, l) => mapAccumIndexed(
  R.pipe(
    list,
    updateIndex(1, fMap),
    updateIndex(0, fAcc)
  ), init, l
));
module.exports.custMapAccumIndexed = custMapAccumIndexed;

const moveVal = R.curry((srcPath, targetPath, target) => R.assocPath(targetPath, R.path(srcPath, target), target));
module.exports.moveVal = moveVal;

const moveValAndMapSrc = R.curry((f, sp, tp, t) => f(moveVal(sp, tp, t)));
module.exports.moveValAndMapSrc = moveValAndMapSrc;

/**
 * Move value and delete previous
 * @param {Array} sp - source path
 * @param {Array} tp - target path
 * @param {Object | Array} t - target
 */
const moveValF = R.curry((sp, tp, t) => R.pipe(moveVal(sp, tp), R.dissocPath(sp))(t));
module.exports.moveValF = moveValF;

const encapsulate = R.curry((path, target) => R.objOf(R.path(path, target), target));
module.exports.encapsulate = encapsulate;

const encapMergeAll = R.curry((path, l) => R.mergeAll(R.map(encapsulate(path), l)));
module.exports.encapMergeAll = encapMergeAll;

const omitAndEncapMergeAll = R.curry((encP, omitP, l) => R.mergeAll(
  R.map(R.pipe(R.omit(omitP), encapsulate(encP)), l)));
module.exports.omitAndEncapMergeAll = omitAndEncapMergeAll;
