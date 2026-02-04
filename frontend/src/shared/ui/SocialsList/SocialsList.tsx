import classNames from "classnames";

import { isValidUrl } from "@/shared/utils";

import "./SocialsList.scss";

interface ISocialItem {
	displayName: string;
	link: string;
	visible: boolean;
}

interface ISocialsListProps {
	socials: ISocialItem[];
}

export function SocialsList({ socials }: ISocialsListProps) {
	return (
		<ul className="socials-list d-flex justify-content-end">
			{socials.map(({ displayName, link, visible }) => {
				if (!visible) return null;

				const iconClass = classNames(
					"socials-list__icon",
					displayName.toLowerCase(),
				);

				return (
					<li key={displayName} className="socials-list__item">
						{isValidUrl(link) ? (
							<a
								href={link}
								className="socials-list__link"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className={iconClass} />
							</a>
						) : (
							<div className={iconClass} />
						)}
					</li>
				);
			})}
		</ul>
	);
}
