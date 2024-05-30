const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const addItemToStorage = (key, item, username) => {
    const items = getFromStorage(key) || [];
    items.push(item);
    saveToStorage(key, items);
    logAction(`add_${key}`, username);
};

const removeItemFromStorage = (key, index, username) => {
    const items = getFromStorage(key) || [];
    items.splice(index, 1);
    saveToStorage(key, items);
    logAction(`remove_${key}`, username);
};

const updateItemInStorage = (key, index, newItem, username) => {
    const items = getFromStorage(key) || [];
    items[index] = newItem;
    saveToStorage(key, items);
    logAction(`update_${key}`, username);
};

function logAction(action, username) {
    const logs = getFromStorage('user_logs') || [];
    logs.push({ action, username, timestamp: new Date().toISOString() });
    saveToStorage('user_logs', logs);
}
