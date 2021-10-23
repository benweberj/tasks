import java.util.*;

public class Supreme {
	public static void main(String[] args) throws InterruptedException {
		supreme();
		System.out.println();
		randomSupreme();
		System.out.println();
	}

	public static void supreme() throws InterruptedException {
		String supreme = "supreme";
		System.out.print("                                   ");
		for (int i = 0; i < supreme.length(); i++) {
			System.out.print(" " + supreme.substring(i, i+1).toUpperCase());
			Thread.sleep(250);
			System.out.print(" .");
			Thread.sleep(500);
		}
	}

	public static void randomSupreme() throws InterruptedException {
		String[] items = {"0", "1", "supreme", "0", "1", "0", "1", "0", "1", };
		Random rand = new Random();

		for (int i = 0; i < 1000000; i++) {
			System.out.print(items[rand.nextInt(3)] + " ");
			Thread.sleep(5);
			if (rand.nextInt(420) == 69) {
				randomEvent();
			}
		}
	}

	public static void randomEvent() throws InterruptedException {
		System.out.print(" **SUPREMING IN PROGRESS** ");
		for (int i = 0; i < 10; i++) {
			System.out.print(". ");
			Thread.sleep(100);
		}
	}
}
