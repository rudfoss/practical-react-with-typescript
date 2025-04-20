FROM mcr.microsoft.com/devcontainers/base:bullseye

ARG USERNAME=vscode

# Used to persist bash history as per https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
	&& mkdir /commandhistory \
	&& touch /commandhistory/.bash_history \
	&& chown -R $USERNAME /commandhistory \
	&& echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"

# Install zsh
RUN rm -rf /root/.oh-my-zsh \
	&& sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
