/* tor.c */
#include "tor.h"

int main(int argc, char *argv[]){
	char *host;
	int port, s;

	if (argc < 3){
			fprintf(stderr, "Usage: %s <host> <port>\n",
				argv[0]);

			return -1;
	}

	host = argv[1];
	port = atoi(argv[2]);

	s = socket(AF_INET, SOCK_STREAM, 0);
	if (s < 0){
		perror("socket");
	}
}