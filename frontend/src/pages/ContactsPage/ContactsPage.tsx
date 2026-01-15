import bannersConfig from "@/configs/banners.json";
import contactsConfig from "@/configs/contacts.json";
import { MainBanner } from "@/shared/ui";

import "./ContactsPage.scss";

/**
 * Компонент страницы «Контакты».
 */
export default function ContactsPage() {
	const { link: phoneLink, value: phoneNumber } = contactsConfig.phone.main;
	const { link: emailLink, value: emailValue } = contactsConfig.email.main;
	const { days, time } = contactsConfig.workTime;

	return (
		<>
			<MainBanner banners={bannersConfig.main} />

			<section className="contacts-section pt-4rem">
				<h2 className="text-center">Контакты</h2>
				<address>
					<p>{contactsConfig.address}</p>

					<h5 className="text-center">Координаты для связи:</h5>

					<p>
						Телефон: <a href={phoneLink}>{phoneNumber}</a> ({days.toLowerCase()}
						: {time})
					</p>

					<p>
						Email: <a href={emailLink}>{emailValue}</a>
					</p>
				</address>
			</section>
		</>
	);
}
