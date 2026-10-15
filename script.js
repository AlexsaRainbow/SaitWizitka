(function () {
		// Сколько превью показывать одновременно
		const VISIBLE = 4;

		//Сбор элементов со страницы
		const links    = Array.from(document.querySelectorAll('.thumbs__link'));
		const prevBtn  = document.getElementById('prevBtn');
		const nextBtn  = document.getElementById('nextBtn');

		let page = 0; // текущая "страница" ленты (0, 1, 2, ...)

		// ---------- Показать нужную "страницу" превью ----------
		function renderThumbs() {
			const start = page * VISIBLE;
			const end   = start + VISIBLE;

			links.forEach((link, i) => {
				if (i >= start && i < end) {
					link.classList.add('visible');
				} else {
					link.classList.remove('visible');
				}
			});

			// Кнопки активны только если есть куда идти
			prevBtn.disabled = (page === 0);
			nextBtn.disabled = (page >= Math.ceil(links.length / VISIBLE) - 1);
		}

		// ---------- Активировать кадр (показать большое фото + описание) ----------
		function activate(id) {
			// Устанавливаем hash — CSS :target покажет нужный кадр
			location.hash = id;
		}

		// ---------- Обработка стрелок ----------
		nextBtn.addEventListener('click', () => {
			const lastPage = Math.ceil(links.length / VISIBLE) - 1;
			if (page < lastPage) {
				page++;
				renderThumbs();

				// Активируем первое превью новой страницы
				const firstOnPage = links[page * VISIBLE];
				if (firstOnPage) activate(firstOnPage.dataset.id);
			}
		});

		prevBtn.addEventListener('click', () => {
			if (page > 0) {
				page--;
				renderThumbs();

				// Активируем последнее превью новой страницы
				const lastOnPage = links[page * VISIBLE + VISIBLE - 1] || links[links.length - 1];
				if (lastOnPage) activate(lastOnPage.dataset.id);
			}
		});

		// ---------- Инициализация ----------
		renderThumbs();
		// Если в URL нет якоря — открываем первый кадр
		if (!location.hash) {
			activate('c1');
		}
	})();