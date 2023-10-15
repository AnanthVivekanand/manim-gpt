from manim import *

class Integrals(Scene):
    def construct(self):
        ax = Axes(
            x_range=[0, 5, 1],
            y_range=[0, 2, 1],
            x_length=5,
            y_length=2,
            x_axis_config={"numbers_to_include": np.arange(0, 6, 1)},
            y_axis_config={"numbers_to_include": np.arange(0, 3, 1)},
            tips=False,
        )

        labels = ax.get_axis_labels()

        curve1 = ax.plot(lambda x: 2*np.sin(x), color=YELLOW, stroke_width=2)
        curve2 = ax.plot(lambda x: np.cos(x), color=BLUE, stroke_width=2)

        area1 = ax.get_area(curve1, x_range=[0, 5], color=BLUE, opacity=0.3)
        area2 = ax.get_area(curve2, x_range=[0, 5], color=YELLOW, opacity=0.3)

        self.play(Create(ax), Create(labels), run_time=2)
        self.play(Create(curve1), Create(curve2), run_time=2)
        self.play(FadeIn(area1), FadeIn(area2), run_time=2)
        self.wait()
