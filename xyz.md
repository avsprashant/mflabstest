Three little tweaks just aimed at making it a little easier to use. [Example](https://github.com/HabitatEnergy/ControlBox/blob/44b85221df0ee7dcab73c19bdccc165f19de9f64/.github/workflows/python.yaml#L29):

```yaml
  publish-image:
    needs: build
    uses: HabitatEnergy/infra-reusable-workflows/.github/workflows/publish-image.yaml@couling-patch-1
    with:
      aws-profile: uk
      repository: 479162328326.dkr.ecr.eu-west-2.amazonaws.com/control-box
      # Docker file depends on dist created with poetry build
      download-artifacts-from-build: true
      push: true # ${{ github.event_name != 'pull_request' }}
      # Use the default tag except for push
      tag: ${{ github.event_name != 'release' && 'latest' || '' }}
```

Default tag ought to include the build number and the code number. It helps traceability. We always tag code and releases certainly do.  A `git describe --tags` is better for this because it also does a good job of making a meaningful docker tag when there's no immediate git tag.  Other than that, rather than hard-coding `"latest"` we can let the project override it by passing in it's own tag.

I've renamed the input argument "file" to "dockerfile" to be clear. It can default to just `Dockerfile`. I _think_ quite a few of us are starting to put dockerfiles in the root of the directory. But again this can be overriden.

I think it's fine to have the full url to the repo in the repo url rather than splitting variables. It's visible with a clickable copy button in the AWS console.

<img width="1045" alt="Screenshot 2023-06-29 at 01 18 31" src="https://github.com/HabitatEnergy/infra-reusable-workflows/assets/23001043/e8a66675-5d17-487a-8841-41dab56b9b21">


