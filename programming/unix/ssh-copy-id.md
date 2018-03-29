# `ssh-copy-id`

- To do this, you have to:
  - `brew install ssh-copy-id`.
  - SSH into the remote normally.
  - Create a user named `deploy` (`sudo useradd -d /home/deploy -m deploy`).
  - Set a password `sudo passwd deploy`.
  - Add him as a sudoer, in `sudo visudo`, paste this: `deploy ALL=(ALL:ALL) ALL`
  - On local,
    - `ssh-copy-id deploy@ec2-13-250-113-194.ap-southeast-1.compute.amazonaws.com`, take note of the username, it should be `deploy`.
    - This copies your public keys over to the SSH.
    - You can then do: `ssh 'deploy@ec2-13-250-113-194.ap-southeast-1.compute.amazonaws.com'` without supplying your keys.
