import "./MainBanner.scss";

/**
 * Тип, описывающий данные об одном баннере
 */
type MainBannerType = {
	text: string;
	src: string;
};

/**
 * Интерфейс, описывающий свойства компонента {@link MainBanner}.
 */
interface IMainBannerProps {
	banners: MainBannerType[];
}

/**
 * Компонент основного баннера
 */
export function MainBanner({ banners }: IMainBannerProps) {
	const banner = banners[0];
	if (!banner) return null;

	return (
		<div className="main-banner">
			<div className="main-banner__item" key={banner.text}>
				<img src={banner.src} alt={banner.text} className="img-fluid" />
				<h2 className="main-banner__item-header">{banner.text}</h2>
			</div>
		</div>
	);
}
