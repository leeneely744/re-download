const MAX_NUM_LIST_ITEM = 30;

chrome.downloads.onCreated.addListener((downloadItem) => {
  // 保存数が限界になったら古い順に削除していく
  chrome.storage.local.get(null, removeFirstStorageItemIfNecessary);

  let storageKey = Date.now()
  chrome.storage.local.set({[storageKey]: downloadItem.url});
});

const removeFirstStorageItemIfNecessary = (storageItems) => {
  if (storageItems.length >= MAX_NUM_LIST_ITEM) {
    let firstKey = Object.keys(storageItems)[0];
    chrome.storage.local.remove(firstKey);
  }
}