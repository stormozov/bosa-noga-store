import { API_BASE_URL } from "@/configs/config";

/**
 * URL эндпоинта для работы с товарами (items).
 *
 * Формируется путём добавления пути `/api/items` к базовому URL API.
 * Используется в запросах получения списка товаров, деталей и т.д.
 *
 * @example
 * GET ${ITEMS_API} — получить список товаров
 */
export const ITEMS_API = `${API_BASE_URL}/api/items`;

/**
 * URL эндпоинта для работы с категориями.
 *
 * Формируется путём добавления пути `/api/categories` к базовому URL API.
 * Используется для получения иерархии или списка категорий каталога.
 *
 * @example
 * GET ${CATEGORIES_API} — получить список категорий
 */
export const CATEGORIES_API = `${API_BASE_URL}/api/categories`;
