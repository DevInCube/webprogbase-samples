#include <stdio.h>
#include <stdlib.h>
#include <progbase.h> // required -lprogbase
#include <progbase/console.h>
#include <progbase/canvas.h>
#include <time.h>
#include <math.h> // required -lm
#include <stdbool.h>

#define PI 3.1415926

typedef struct l_Color
{
	short R;
	short G;
	short B;
} t_Color;

typedef struct l_line
{
	int x1;
	int y1;
	int x2;
	int y2;
	float vel;
	t_Color color;
} t_line;

typedef struct l_circ
{
	int x;
	int y;
	int r;
	float vel;
	short dir;
	float step;
	t_Color color;
} t_circ;

int main(int argc, char **argv)
{
	srand(time(NULL));

	t_circ *Cn;
	t_line *Ln;
	const int N = atoi(argv[1]);

	if ((Ln = (t_line *)malloc(sizeof(t_line) * N)) == NULL)
		return (1);
	if ((Cn = (t_circ *)malloc(sizeof(t_circ) * N)) == NULL)
		return (1);

	
	for (int i = 0; i < N; i++) // change values
	{
		Ln[i].color.R = rand() % 255;
		Ln[i].color.G = rand() % 255;
		Ln[i].color.B = rand() % 255;

		Ln[i].vel = rand() % 100 / 30000.0 * (rand() % 2 ? 1 : -1); //0.001;

		Cn[i].dir = rand() % 2 ? 1 : -1; // result is up/down
		Cn[i].r = rand() % 5 + 5;
		Cn[i].vel = rand() % 100 / 1000.0; //0.02;

		Cn[i].color.R = rand() % 255;
		Cn[i].color.G = rand() % 255;
		Cn[i].color.B = rand() % 255;
	}
	//
	float tik = 0;

	Console_clear();
	Canvas_invertYOrientation();
	while (1)
	{
		struct ConsoleSize cs = Console_size();
		int w = cs.columns;
		int h = cs.rows * 2;

		float r = sqrt(pow(w, 2) + pow(h, 2)); // its half of your window diagonal (hypotenuse)

		tik += 1;
		for (int i = 0; i < N; i++)
		{
			Ln[i].x1 = w / 2 - r * cos(tik * Ln[i].vel);
			Ln[i].y1 = h / 2 - r * sin(tik * Ln[i].vel);
			Ln[i].x2 = w / 2 + r * cos(tik * Ln[i].vel);
			Ln[i].y2 = h / 2 + r * sin(tik * Ln[i].vel);
			Cn[i].step += Cn[i].vel;
			//checking out of window size
			if (Cn[i].x - Cn[i].r <= 0 || Cn[i].x + Cn[i].r >= w)
			{
				Cn[i].dir *= -1;
				// Cn[i].vel *= -1;//Ln[i].vel;
				Cn[i].step = 0;
			}
			if (Cn[i].y - Cn[i].r <= 0 || Cn[i].y + Cn[i].r >= h)
			{
				Cn[i].dir *= -1;
				// Cn[i].vel *= -1;//Ln[i].vel;
				Cn[i].step = 0;
			}

			Cn[i].x = w / 2 + Cn[i].dir * Cn[i].step * cos(tik * Ln[i].vel);
			Cn[i].y = h / 2 + Cn[i].dir * Cn[i].step * sin(tik * Ln[i].vel);
		}
		Canvas_setSize(w, h);
		Canvas_beginDraw(); // drawing figures
		int i = 0;
		for (int i = 0; i < N; i++)
		{
			Canvas_setColorRGB(Ln[i].color.R, Ln[i].color.G, Ln[i].color.B);
			Canvas_fillCircle(Cn[i].x, Cn[i].y, Cn[i].r);
			Canvas_setColorRGB(Cn[i].color.R, Cn[i].color.G, Cn[i].color.B);

			Canvas_strokeLine(Ln[i].x1, Ln[i].y1, Ln[i].x2, Ln[i].y2);
			Canvas_strokeCircle(Cn[i].x, Cn[i].y, Cn[i].r);
		}
		Canvas_endDraw();
		if (Console_isKeyDown())
			break;
	}
	free(Cn);
	return 0;
}
