export function makeArrayUniqueByKey(arr: any[], key: string) {
    const uniqueMap = new Map();
    arr.forEach(item => {
        uniqueMap.set(item[key], item);
    });
    const uniqueArray = Array.from(uniqueMap.values());
    return uniqueArray;
}