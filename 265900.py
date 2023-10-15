from manim import *

class Integrals(Scene):
    def construct(self):
        ax = Axes(
            x_range=[-1, 10, 1],
            y_range=[-1, 10, 1],
            x_length=10,
            y_length=10,
            x_axis_config={"numbers_to_include": np.arange(-1, 10, 1)},
            y_axis_config={"numbers_to_include": np.arange(-1, 10, 1)},
        )

        curve1 = ax.plot(lambda x: 2*np.sin(x), color=YELLOW, stroke_width=2.5)
        curve2 = ax.plot(lambda x: np.cos(x), color=BLUE, stroke_width=2.5)

        area1 = ax.get_area(curve1, range_color=BLUE, bounds=(0, 5))
        area2 = ax.get_area(curve2, range_color=YELLOW, bounds=(0, 5))

        self.play(Create(ax), Create(curve1), Create(curve2))
        self.wait()

        self.play(FadeIn(area1), run_time=2)
        self.wait()

        self.play(Transform(area1, area2), run_time=2)
        self.wait()
