// External Dependencies
import { useCallback } from 'react';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';

// Internal Dependencies
import style from './SetupLayout.module.scss';

export default function SetupLayout({
	children
}: {
	children: JSX.Element;
}): JSX.Element {
	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine);

		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			await console.log(container);
		},
		[]
	);

	return (
		<div className={style.main}>
			<Particles
				id='tsparticles'
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					fpsLimit: 120,
					interactivity: {
						events: {
							onClick: {
								enable: true,
								mode: 'push'
							},
							onHover: {
								enable: true,
								mode: 'grab',
								parallax: {
									enable: true,
									force: 100,
									smooth: 10
								}
							},
							resize: true
						},
						modes: {
							push: {
								quantity: 4
							},
							grab: {
								distance: 200,
								links: {
									blink: false,
									consent: false,
									opacity: 1
								}
							}
						}
					},
					particles: {
						color: {
							value: '#ffffff'
						},
						links: {
							color: '#ffffff',
							distance: 200,
							enable: true,
							opacity: 0.8,
							width: 1
						},
						collisions: {
							enable: true
						},
						move: {
							direction: 'none',
							enable: true,
							outModes: {
								default: 'bounce'
							},
							random: false,
							speed: 1,
							straight: false
						},
						number: {
							density: {
								enable: true,
								area: 1000
							},
							value: 100
						},
						opacity: {
							value: 0.5
						},
						shape: {
							type: 'rectangle'
						},
						size: {
							value: { min: 1, max: 6 }
						}
					},
					detectRetina: true
				}}
			/>

			<div className={style.content}>
				<div>
					<div className={style.logoWrapper}>
						<img
							src='/logo.svg'
							alt='ContinuumCI Logo'
							className={style.logo}
						/>
						<h1 className={style.title}>ContinuumCI</h1>
					</div>
					{children}
				</div>
				<div className={style.footer}>
					<p>
						ContinuumCI is a project by Linus Romland. The source
						code is available on{' '}
						<a href='https://github.com/linusromland/ContinuumCI'>
							GitHub
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
