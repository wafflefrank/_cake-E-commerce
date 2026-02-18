/**
 * 獲取 public 目錄資源的 URL
 * 自動處理 base URL（用於 GitHub Pages 等子路徑部署）
 * @param {string} path - 相對於 public 目錄的路徑（如 'images/cake_1.jpg'）
 * @returns {string} 完整的 URL 路徑
 * 
 * @example
 * getPublicUrl('images/cake_1.jpg') 
 * // 開發環境: '/images/cake_1.jpg'
 * // 生產環境: '/_cake-E-commerce/images/cake_1.jpg'
 */
export function getPublicUrl(path) {
  // 移除開頭的斜線（如果有的話）
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // 使用 import.meta.env.BASE_URL 自動處理 base URL
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
