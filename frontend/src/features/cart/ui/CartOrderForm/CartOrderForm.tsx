import classNames from "classnames";
import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { useApiPost } from "@/api";
import { type IOrderFormData, useCart } from "@/features/cart";
import { ButtonLoading } from "@/features/Preloader";
import {
	formatRussianPhoneNumber,
	isValidRussianPhoneNumber,
} from "@/shared/utils";

import "./CartOrderForm.scss";

const USER_ORDER_DATA_STORAGE_KEY = "userOrderData";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 часов (в миллисекундах)

/**
 * Интерфейс, описывающий структуру сохранённых данных формы заказа
 * в localStorage.
 */
interface IStoredFormData {
	data: IOrderFormData;
	timestamp: number;
}

const INITIAL_FORM_DATA: IOrderFormData = {
	phone: "",
	address: "",
};

const getStoredFormData = (): IOrderFormData => {
	const savedData = localStorage.getItem(USER_ORDER_DATA_STORAGE_KEY);
	if (!savedData) return INITIAL_FORM_DATA;

	try {
		const parsed = JSON.parse(savedData);
		const now = Date.now();

		if (parsed.data && typeof parsed.timestamp === 'number') {
			if (now - parsed.timestamp > EXPIRATION_TIME) {
				localStorage.removeItem(USER_ORDER_DATA_STORAGE_KEY);
				return INITIAL_FORM_DATA;
			}
			return parsed.data;
		}

		localStorage.removeItem(USER_ORDER_DATA_STORAGE_KEY);
		return INITIAL_FORM_DATA;
	} catch {
		localStorage.removeItem(USER_ORDER_DATA_STORAGE_KEY);
		return INITIAL_FORM_DATA;
	}
};

const hasStoredFormData = (): boolean => {
	const savedData = localStorage.getItem(USER_ORDER_DATA_STORAGE_KEY);
	if (!savedData) return false;

	try {
		const parsed: IStoredFormData = JSON.parse(savedData);
		const now = Date.now();
		return now - parsed.timestamp <= EXPIRATION_TIME;
	} catch {
		return false;
	}
};

/**
 * Проверяет, заполнены ли все обязательные поля формы заказа.
 *
 * Учитывает только пробельные символы (trim), не валидирует формат.
 */
const isOrderFormDataComplete = ({
	phone,
	address,
}: IOrderFormData): boolean => {
	return phone.trim() !== "" && address.trim() !== "";
};

interface ICartOrderFormProps {
	handleSubmit?: () => void;
}

export function CartOrderForm({ handleSubmit }: ICartOrderFormProps) {
	const [formData, setFormData] = useState<IOrderFormData>(getStoredFormData());
	const [agreement, setAgreement] = useState(false);
	const [shouldPersistFormData, setShouldPersistFormData] = useState<boolean>(
		hasStoredFormData(),
	);

	const [debouncedPhone] = useDebounce(formData.phone, 500);

	const {
		states: { items },
		actions: { clearCartItems },
	} = useCart();
	const { submitOrder, isLoading, error, success, reset } = useApiPost();

	const phoneError = useMemo(() => {
		return debouncedPhone && !isValidRussianPhoneNumber(debouncedPhone)
			? "Корректный формат: +7 (999) 999-99-99"
			: "";
	}, [debouncedPhone]);

	const isFormSubmittable =
		agreement && isOrderFormDataComplete(formData) && !phoneError;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const syncFormDataWithStorage = () => {
		if (shouldPersistFormData) {
			const dataToStore: IStoredFormData = {
				data: formData,
				timestamp: Date.now(),
			};
			localStorage.setItem(
				USER_ORDER_DATA_STORAGE_KEY,
				JSON.stringify(dataToStore),
			);
		} else {
			localStorage.removeItem(USER_ORDER_DATA_STORAGE_KEY);
		}
	};

	const onClearPhoneOnly = () => setFormData({ ...formData, phone: "" });
	const onClearAddressOnly = () => setFormData({ ...formData, address: "" });

	const clearForm = () => {
		setFormData(INITIAL_FORM_DATA);
		setAgreement(false);
		setShouldPersistFormData(false);
	};

	const resetAfterOrderPlacement = useEffectEvent(() => {
		clearForm();
		reset();
		clearCartItems();
	});

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		syncFormDataWithStorage();
		await submitOrder({ owner: formData, items });
	};

	useEffect(() => {
		if (success && !isLoading) {
			resetAfterOrderPlacement();
			handleSubmit?.();
		}
	}, [success, isLoading, handleSubmit]);

	return (
		<div className="cart-order-form-container card">
			<form className="cart-order-form card-body" onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="phone">
						Телефон <sup>*</sup>
					</label>
					<div className="input-group">
						<input
							type="tel"
							name="phone"
							className={classNames("cart-order-form__input", "form-control", {
								"is-invalid": phoneError,
							})}
							id="phone"
							placeholder="Ваш телефон"
							title="Корректный формат: +7 (999) 999-99-99"
							autoComplete="tel"
							value={
								phoneError
									? formData.phone
									: formatRussianPhoneNumber(formData.phone)
							}
							disabled={isLoading}
							onChange={onInputChange}
							required
						/>
						{formData.phone && (
							<button
								type="button"
								className="cart-order-form__clear"
								title="Очистить"
								onClick={onClearPhoneOnly}
							>
								&times;
							</button>
						)}
					</div>
					{phoneError && (
						<div className="cart-order-form__phone-error">{phoneError}</div>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="address">
						Адрес доставки <sup>*</sup>
					</label>
					<div className="input-group">
						<input
							type="text"
							name="address"
							className="cart-order-form__input form-control"
							id="address"
							placeholder="Адрес доставки"
							autoComplete="address-line1"
							value={formData.address}
							disabled={isLoading}
							onChange={onInputChange}
							required
						/>
						{formData.address && (
							<button
								type="button"
								className="cart-order-form__clear"
								title="Очистить"
								onClick={onClearAddressOnly}
							>
								×
							</button>
						)}
					</div>
				</div>

				<div className="form-group form-check">
					<input
						type="checkbox"
						name="checkbox"
						className="form-check-input"
						id="agreement"
						checked={agreement}
						disabled={isLoading}
						onChange={(e) => setAgreement(e.target.checked)}
						required
					/>
					<label
						htmlFor="agreement"
						className="cart-order-form__agreement-label form-check-label"
					>
						Согласен с правилами доставки <sup>*</sup>
					</label>
				</div>

				{isFormSubmittable && (
					<div className="form-group form-check">
						<input
							type="checkbox"
							name="checkbox-save-data"
							className="form-check-input"
							id="agreement-save-data"
							checked={shouldPersistFormData}
							disabled={isLoading}
							onChange={(e) => setShouldPersistFormData(e.target.checked)}
						/>
						<label
							htmlFor="agreement-save-data"
							className="cart-order-form__agreement-label form-check-label"
							title="Данные сохранятся в локальное хранилище вашего браузера"
						>
							Сохранить данные
						</label>
					</div>
				)}

				<div className="form-group">
					<button
						type="submit"
						className="btn btn-outline-secondary"
						title={!isFormSubmittable ? "Заполните все поля" : ""}
						disabled={!isFormSubmittable || isLoading}
					>
						{!error && isLoading ? (
							<ButtonLoading dotsColor="#727e86" />
						) : isFormSubmittable ? (
							"Оформить заказ"
						) : (
							"Заполните все поля"
						)}
					</button>

					{isFormSubmittable && (
						<button
							type="button"
							className="btn btn-outline-secondary ml-2"
							disabled={isLoading}
							onClick={clearForm}
						>
							Очистить
						</button>
					)}
				</div>

				{!isLoading && error && (
					<div className="cart-order-form__error alert alert-danger mt-3 mb-0">
						{error}
					</div>
				)}
			</form>
		</div>
	);
}
