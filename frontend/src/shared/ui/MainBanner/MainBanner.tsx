import "./MainBanner.scss";

const basename = import.meta.env.VITE_BASENAME;

interface MainBannerItem {
	text: string;
	src: string;
};

interface IMainBannerProps {
	banners: MainBannerItem[];
}

export function MainBanner({ banners }: IMainBannerProps) {
	const banner = banners[0];
	if (!banner) return null;

	return (
		<div className="main-banner">
			<div className="main-banner__item" key={banner.text}>
				<img src={`${basename}${banner.src}`} alt={banner.text} className="img-fluid" />
				<h2 className="main-banner__item-header d-flex align-items-center justify-content-center m-0">
					{banner.text}
				</h2>
			</div>
		</div>
	);
}
