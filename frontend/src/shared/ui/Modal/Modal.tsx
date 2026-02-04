import { useLockBodyScroll } from "@/shared/hooks";

import styles from "./Modal.module.scss";

interface IModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: IModalProps) {
	useLockBodyScroll(isOpen);

	return (
		<div className={styles.modal} role="dialog">
			<div className={`modal-dialog ${styles["modal-dialog"]}`} role="document">
				<div className="modal-content">
					<header className="modal-header">
						<h5 className="modal-title">Ваш заказ оформлен</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							title="Закрыть"
							onClick={onClose}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</header>

					{children && <div className="modal-body">{children}</div>}

					<footer className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={onClose}>
							На главную
						</button>
					</footer>
				</div>
			</div>
		</div>
	);
}
