import contactsConfig from "@/configs/contacts.json";
import navConfigs from "@/configs/nav.json";
import paySystemsConfig from "@/configs/paySystems.json";
import { NavList, PaySystems, parsePaySystems, SocialsList } from "@/shared/ui";

import "./PageFooter.scss";

/**
 * Компонент подвала страницы.
 */
export default function PageFooter() {
	const { phone, email, workTime, socials } = contactsConfig;
	const {
		value: phoneNumber,
		link: phoneLink,
		visible: phoneVisible,
	} = phone.main;
	const {
		value: emailValue,
		link: emailLink,
		visible: emailVisible,
	} = email.main;
	const {
		days: workingDays,
		time: workingTime,
		visible: workTimeVisible,
	} = workTime;
	const { list: socialsList, visible: socialsVisible } = socials;
	const { links: navLinks, visible: navVisible } = navConfigs.footer;

	return (
		<footer className="footer container bg-light">
			<div className="row">
				{navVisible && Object.keys(navLinks).length > 0 && (
					<div className="col">
						<section className="footer-info pt-1rem">
							<h5>Информация</h5>
							<NavList links={navLinks} classes="nav flex-column" />
						</section>
					</div>
				)}

				<div className="col">
					{paySystemsConfig.length > 0 && (
						<section className="footer-pay pt-1rem">
							<h5>Принимаем к оплате:</h5>
							<PaySystems systems={parsePaySystems(paySystemsConfig)} />
						</section>
					)}

					<section className="footer-copyright pt-1rem">
						<div className="footer-copyright">
							<p>
								2009-2019 &#169; BosaNoga.ru — модный интернет-магазин обуви и
								аксессуаров. Все права защищены.
							</p>
							<p>Доставка по всей России!</p>
						</div>
					</section>
				</div>

				<div className="col text-right">
					<section className="footer-contacts pt-1rem">
						<h5>Контакты:</h5>
						<address>
							{phoneVisible && (
								<a href={phoneLink} className="footer-contacts__phone">
									{phoneNumber}
								</a>
							)}

							{workTimeVisible && (
								<span className="footer-contacts__working-time">
									{workingDays}: {workingTime}
								</span>
							)}

							{emailVisible && (
								<a href={emailLink} className="footer-contacts__email">
									{emailValue}
								</a>
							)}

							{socialsVisible && (
								<div className="footer-contacts__socials">
									<SocialsList socials={socialsList} />
								</div>
							)}
						</address>
					</section>
				</div>
			</div>
		</footer>
	);
}
