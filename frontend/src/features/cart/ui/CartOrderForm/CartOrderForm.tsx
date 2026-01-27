import classNames from "classnames";
import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { useApiPost } from "@/api";
import { type ICartFormData, useCart } from "@/features/cart";
import { ButtonLoading } from "@/features/Preloader";
import {
	formatRussianPhoneNumber,
	isValidRussianPhoneNumber,
} from "@/shared/utils";

import "./CartOrderForm.scss";

/**
 * Начальное состояние данных формы корзины.
 *
 * Используется для инициализации формы оформления заказа. Все поля
 * соответствуют интерфейсу {@link ICartFormData} и содержат пустые строки
 * в качестве значений по умолчанию.
 *
 * @example
 * ```ts
 * const formData = { ...INITIAL_FORM_DATA };
 * // formData: { phone: "", address: "" }
 * ```
 *
 * @see {@link ICartFormData} - интерфейс структуры данных формы
 */
const INITIAL_FORM_DATA: ICartFormData = {
	phone: "",
	address: "",
};

/**
 * Интерфейс, описывающий свойства компонента {@link CartOrderForm}.
 */
interface ICartOrderFormProps {
	/** Функция, вызываемая при отправке формы */
	handleSubmit?: () => void;
}

/**
 * Компонент формы оформления заказа.
 */
export function CartOrderForm({ handleSubmit }: ICartOrderFormProps) {
	const [formData, setFormData] = useState<ICartFormData>(INITIAL_FORM_DATA);
	const [agreement, setAgreement] = useState(false);

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

	const isFormValid =
		agreement &&
		formData.phone.trim() !== "" &&
		formData.address.trim() !== "" &&
		!phoneError;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onClearPhoneOnly = () => setFormData({ ...formData, phone: "" });
	const onClearAddressOnly = () => setFormData({ ...formData, address: "" });

	const onClearForm = useEffectEvent(() => {
		setFormData(INITIAL_FORM_DATA);
		setAgreement(false);
		reset();
		clearCartItems();
	});

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await submitOrder({ owner: formData, items });
	};

	useEffect(() => {
		if (success && !isLoading) {
			onClearForm();
			handleSubmit?.();
		}
	}, [success, isLoading, handleSubmit]);

	return (
		<div className="cart-order-form-container card">
			<form className="cart-order-form card-body" onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="phone">Телефон</label>
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
					<label htmlFor="address">Адрес доставки</label>
					<div className="input-group">
						<input
							type="text"
							name="address"
							className="cart-order-form__input form-control"
							id="address"
							placeholder="Адрес доставки"
							autoComplete="address-line1"
							value={formData.address}
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
						onChange={(e) => setAgreement(e.target.checked)}
						required
					/>
					<label
						htmlFor="agreement"
						className="cart-order-form__agreement-label form-check-label"
					>
						Согласен с правилами доставки
					</label>
				</div>

				<button
					type="submit"
					className="btn btn-outline-secondary"
					title={!isFormValid ? "Заполните все поля" : ""}
					disabled={!isFormValid || isLoading}
				>
					{!error && isLoading ? (
						<ButtonLoading dotsColor="#727e86" />
					) : isFormValid ? (
						"Оформить заказ"
					) : (
						"Заполните все поля"
					)}
				</button>

				{!isLoading && error && (
					<div className="cart-order-form__error alert alert-danger mt-3 mb-0">
						{error}
					</div>
				)}
			</form>
		</div>
	);
}
